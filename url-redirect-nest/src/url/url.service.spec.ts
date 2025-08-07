import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';

describe('UrlService', () => {
  let service: UrlService;
  let repository: UrlRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: UrlRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    repository = module.get<UrlRepository>(UrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create and return the result', async () => {
      const targetUrl = 'https://example.com';
      const mockResult = {
        id: 1,
        slug: 'abc123',
        target: targetUrl,
        createdAt: '2024-01-01',
      };

      jest.spyOn(repository, 'create').mockResolvedValue(mockResult);

      const result = await service.create(targetUrl);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.create).toHaveBeenCalledWith(targetUrl);
      expect(result).toEqual(mockResult);
    });
  });

  describe('get', () => {
    it('should call repository.get and return the result', async () => {
      const slug = 'abc123';
      const mockResult = {
        id: 1,
        slug,
        target: 'https://example.com',
        createdAt: '2024-01-01',
      };

      jest.spyOn(repository, 'get').mockResolvedValue(mockResult);

      const result = await service.get(slug);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.get).toHaveBeenCalledWith(slug);
      expect(result).toEqual(mockResult);
    });
  });
});
