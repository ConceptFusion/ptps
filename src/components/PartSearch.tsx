import { FC } from 'react';
import { Button, Card, Divider, Input, InputWrapper } from '@mantine/core';
import styled from 'styled-components';
import { isExcludedPart, usePartsService } from '../PartsServiceContext';

const SearchCard = styled(Card)`
  border: 1px solid #ddd;
`;
const ResultsCard = styled(Card)`
  color: #666;
`;

const PartSearch: FC = () => {
  const {
    exclusions,
    getParts,
    notifyUserOfExclusion,
    partChanged,
    partBlurred,
    partNumber,
    partNumberValid,
    partNumberInvalid,
    partMatch,
    partMatchAlternates,
    noResult,
  } = usePartsService();

  const handlePartNumberBlur = () => {
    partBlurred(partNumber);
  };

  const handlePartNumberChange = (partNumber: string) => {
    partChanged(partNumber);
  };

  const handleLookupPart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isExcludedPart(partNumber, exclusions))
      return notifyUserOfExclusion(partNumber);
    return getParts(partNumber);
  };
  return (
    <div>
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
    </div>
  );
};

export default PartSearch;
