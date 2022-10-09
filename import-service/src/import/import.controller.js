export class ImportController {
  constructor(importService) {
    this.importService = importService;
  }

  async createSignedUrl({ name }) {
    const key = `uploaded/${name}`
    return this.importService.createSignedUrl({ key });
  }
}
