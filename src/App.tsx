import { FC, StrictMode, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Divider,
  Input,
  InputWrapper,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 1rem 0;
`;
const H1 = styled.h1`
  font-weight: 300;
  margin-left: 1rem;
`;
const SearchCard = styled(Card)`
  border: 1px solid #ddd;
`;
const ResultsCard = styled(Card)`
  color: #666;
`;

const partNumberRegex = new RegExp(/^(\d{4})-(\w{4,})$/i);
export const isValidPartNumber = (partNumber: string): boolean =>
  partNumberRegex.test(partNumber);

export const App: FC = () => {
  const notifications = useNotifications();

  interface IPartsTraderPartsService {
    PartNumber: string;
    Description: string;
    alternateParts?: Array<IPartsTraderPartsService>;
  }

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
      setExclusions(response.data);
    });
  }, []);

  useEffect(() => {
    if (partNumberValid) {
      setPartNumberInvalid(false);
    }
  }, [partNumberValid]);

  const handlePartNumberBlur = () => {
    setPartNumberInvalid(!partNumberValid);
  };

  const handlePartNumberChange = (partNumber: string) => {
    setPartNumberValid(isValidPartNumber(partNumber));
    setPartNumber(partNumber);
    setNoResult(false);
  };

  const handleLookupPart = (e: any) => {
    e.preventDefault();
    const partExclusions = exclusions.filter(
      (part) => part.PartNumber.toLowerCase() === partNumber.toLowerCase()
    );
    if (partExclusions.length === 0) {
      axios('PartsService.json').then((response) => {
        const lookupResult = response.data.filter(
          (data: IPartsTraderPartsService) =>
            data.PartNumber.toLowerCase() === partNumber.toLowerCase()
        );
        if (lookupResult.length > 0) {
          setNoResult(false);
          setPartMatch(lookupResult);
          setPartMatchAlternates(lookupResult[0].alternateParts);
        } else {
          setPartMatch([]);
          setNoResult(true);
        }
      });
    } else {
      notifications.showNotification({
        title: `Part excluded!`,
        message: `Part ${partNumber} is in the exclusions list!`,
        color: 'red',
      });
    }
  };

  return (
    <StrictMode>
      <Container>
        <Header>
          <img src='partstrader-logo.jpg' alt='PartsTrader' width='300px' />
          <H1>Parts Service</H1>
        </Header>

        <SearchCard>
          <form onSubmit={(e) => handleLookupPart(e)}>
            <InputWrapper
              id='part-number'
              required
              label='Part Number'
              error={
                partNumberInvalid
                  ? 'Please enter the part number in the correct format (eg.1234-abcd)'
                  : ''
              }
            >
              <Input
                id='part-number'
                placeholder='Enter a valid part number'
                onChange={(event: any) =>
                  handlePartNumberChange(event.currentTarget.value)
                }
                onBlur={() => handlePartNumberBlur()}
                invalid={partNumberInvalid}
              />
            </InputWrapper>
            <br />

            <Button variant='filled' disabled={!partNumberValid} type='submit'>
              Lookup part
            </Button>
          </form>
        </SearchCard>
        <ResultsCard>
          {partMatch.length > 0 && (
            <>
              {partMatch.map((part, index) => (
                <div key={index}>
                  <h2>Part {part.PartNumber} matches these parts:</h2>
                  <ul>
                    <li>
                      <strong>{part.PartNumber}</strong> - {part.Description}
                    </li>
                  </ul>
                </div>
              ))}
              {partMatchAlternates.length > 0 && (
                <>
                  <Divider />
                  <h3>Alternate parts:</h3>
                  <ul>
                    {partMatchAlternates.map((part, index) => (
                      <li key={index}>
                        <strong>{part.PartNumber}</strong> - {part.Description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
          {noResult && (
            <p>
              No parts found matching <strong>${partNumber}</strong>
            </p>
          )}
        </ResultsCard>
      </Container>
    </StrictMode>
  );
};

export default App;
