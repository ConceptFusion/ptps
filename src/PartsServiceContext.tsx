import { createContext, FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNotifications } from '@mantine/notifications';

export interface IPartsService {
  getParts: (partNumber: string) => void;
  notifyUserOfExclusion: (partNumber: string) => void;
  partChanged: (partNumber: string) => void;
  partBlurred: (partNumber: string) => void;
  exclusions: IPartsTraderPartsService[];
  partNumberValid: boolean;
  partNumberInvalid: boolean;
  partNumber: string;
  partMatch: IPartsTraderPartsService[];
  partMatchAlternates: IPartsTraderPartsService[];
  noResult: boolean;
}

export interface IPartsTraderPartsService {
  PartNumber: string;
  Description?: string;
  alternateParts?: IPartsTraderPartsService[];
}

export const PartsServiceContext = createContext<IPartsService | undefined>(
  undefined
);

export const usePartsService = () => {
  const partsService = useContext(PartsServiceContext);
  if (!partsService) {
    throw new Error('usePartsService must be used within PartsServiceProvider');
  }

  return partsService;
};

const partNumberRegex = new RegExp(/^(\d{4})-(\w{4,})$/i);
export const isValidPartNumber = (partNumber: string): boolean =>
  partNumberRegex.test(partNumber);

export const isExcludedPart = (
  partNumber: string,
  exclusions: IPartsTraderPartsService[]
): boolean => {
  const partExclusions = exclusions.filter(
    (part) => part.PartNumber.toLowerCase() === partNumber.toLowerCase()
  );
  return partExclusions.length !== 0;
};

export const PartsServiceProvider: FC = ({ children }) => {
  const notifications = useNotifications();

  const [loading, setLoading] = useState(true);
  const [exclusions, setExclusions] = useState<IPartsTraderPartsService[]>([]);
  const [partNumberInvalid, setPartNumberInvalid] = useState(false);
  const [partNumberValid, setPartNumberValid] = useState(false);
  const [partNumber, setPartNumber] = useState('');
  const [partMatch, setPartMatch] = useState<IPartsTraderPartsService[]>([]);
  const [partMatchAlternates, setPartMatchAlternates] = useState<
    IPartsTraderPartsService[]
  >([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    axios('Exclusions.json').then((response) => {
      setLoading(false);
      setExclusions(response.data);
    });
  }, []);

  useEffect(() => {
    if (partNumberValid) {
      setPartNumberInvalid(false);
    }
  }, [partNumberValid]);

  const notifyUserOfExclusion = (partNumber: string) => {
    notifications.showNotification({
      title: `Part excluded!`,
      message: `Part ${partNumber} is in the exclusions list!`,
      color: 'red',
    });
  };

  const partChanged = (partNumber: string) => {
    setPartNumberValid(isValidPartNumber(partNumber));
    setPartNumber(partNumber);
    setNoResult(false);
  };

  const partBlurred = (partNumber: string) => {
    setPartNumberInvalid(!partNumberValid);
  };

  const getParts = (partNumber: string) => {
    axios('PartsService.json').then((response) => {
      const lookupResult = response.data.filter(
        (data: IPartsTraderPartsService) =>
          data.PartNumber.toLowerCase() === partNumber.toLowerCase()
      );
      if (lookupResult.length > 0) {
        // return lookupResult
        setNoResult(false);
        setPartMatch(lookupResult);
        setPartMatchAlternates(lookupResult[0].alternateParts);
      } else {
        // return []
        setPartMatch([]);
        setNoResult(true);
      }
    });
  };

  return (
    <PartsServiceContext.Provider
      value={{
        notifyUserOfExclusion,
        getParts,
        partChanged,
        partBlurred,
        exclusions,
        partNumber,
        partNumberValid,
        partNumberInvalid,
        partMatch,
        partMatchAlternates,
        noResult,
      }}
    >
      {!loading && children}
    </PartsServiceContext.Provider>
  );
};
