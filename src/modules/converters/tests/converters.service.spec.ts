import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FormatType } from '@shared/enums/format-type.enum';
import { ConvertersService } from '../converters.service';
import { INPUT_CONVERTERS } from '../providers/input-converters.provider';
import { OUTPUT_CONVERTERS } from '../providers/output-converters.provider';

describe('ConvertersService', () => {
  let service: ConvertersService;

  const mockInputConverters = {
    json: { format: FormatType.JSON, convertToJson: jest.fn() },
    string: { format: FormatType.STRING, convertToJson: jest.fn() },
  };

  const mockOutputConverters = {
    xml: { format: FormatType.XML, convertFromJson: jest.fn() },
    json: { format: FormatType.JSON, convertFromJson: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConvertersService,
        {
          provide: INPUT_CONVERTERS,
          useValue: mockInputConverters,
        },
        {
          provide: OUTPUT_CONVERTERS,
          useValue: mockOutputConverters,
        },
      ],
    }).compile();

    service = module.get<ConvertersService>(ConvertersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the file as-is when input format matches output format', async () => {
    const file = 'sample data';
    const result = await service.convert(
      FormatType.STRING,
      FormatType.STRING,
      file,
    );
    expect(result).toBe(file);
  });

  it('should throw BadRequestException for unsupported input format', async () => {
    const file = 'sample data';
    await expect(
      service.convert(
        'unsupported_format' as FormatType,
        FormatType.JSON,
        file,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException for unsupported output format', async () => {
    const file = 'sample data';
    mockInputConverters.json.convertToJson.mockResolvedValueOnce({});
    await expect(
      service.convert(
        FormatType.JSON,
        'unsupported_format' as FormatType,
        file,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('should use the correct input converter and call convertToJson', async () => {
    const file = 'sample data';
    const mockJsonData = { key: 'value' };
    mockInputConverters.json.convertToJson.mockResolvedValueOnce(mockJsonData);

    await service.convert(FormatType.JSON, FormatType.XML, file);

    expect(mockInputConverters.json.convertToJson).toHaveBeenCalledWith(
      file,
      undefined,
      undefined,
    );
  });

  it('should use the correct output converter and call convertFromJson', async () => {
    const file = 'sample data';
    const mockJsonData = { key: 'value' };
    const mockOutput = '<xml>value</xml>';

    mockInputConverters.json.convertToJson.mockResolvedValueOnce(mockJsonData);
    mockOutputConverters.xml.convertFromJson.mockResolvedValueOnce(mockOutput);

    const result = await service.convert(FormatType.JSON, FormatType.XML, file);

    expect(mockOutputConverters.xml.convertFromJson).toHaveBeenCalledWith(
      mockJsonData,
      undefined,
      undefined,
    );
    expect(result).toBe(mockOutput);
  });

  it('should throw BadRequestException when input converter fails', async () => {
    const file = 'sample data';
    mockInputConverters.json.convertToJson.mockRejectedValueOnce(new Error());

    await expect(
      service.convert(FormatType.JSON, FormatType.XML, file),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when output converter fails', async () => {
    const file = 'sample data';
    const mockJsonData = { key: 'value' };

    mockInputConverters.json.convertToJson.mockResolvedValueOnce(mockJsonData);
    mockOutputConverters.xml.convertFromJson.mockRejectedValueOnce(new Error());

    await expect(
      service.convert(FormatType.JSON, FormatType.XML, file),
    ).rejects.toThrow(BadRequestException);
  });
});
