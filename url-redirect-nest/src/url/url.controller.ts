import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('api/v1/urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() body: { targetUrl: string }) {
    const url = await this.urlService.create(body.targetUrl);
    return url;
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const url = await this.urlService.get(slug);
    return url;
  }
}
