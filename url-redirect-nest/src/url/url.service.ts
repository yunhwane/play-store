import { Injectable } from '@nestjs/common';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async create(targetUrl: string) {
    const url = await this.urlRepository.create(targetUrl);
    return url;
  }

  async get(slug: string) {
    const url = await this.urlRepository.get(slug);
    return url;
  }

  async getAll() {
    const urls = await this.urlRepository.getAll();
    return urls;
  }
}
