import styled from "styled-components";

const FileInput = styled.input`
  padding: 10px 20px;
`;

const Label = styled.label`
  display: inline-block;
  cursor: pointer; 
`;

interface FileInputProps {
  appStatus: string;
  handleInputFetch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CsvInput = ({ appStatus, handleInputFetch }: FileInputProps) => (
  <div>
    <Label>
      <FileInput
        disabled={appStatus === 'UPLOADIND'}
        name="file"
        type='file'
        accept='.csv'
        onChange={handleInputFetch}>
      </FileInput>
    </Label>
  </div>
);

export default CsvInput;
