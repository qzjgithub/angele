import { Eleang1Page } from './app.po';

describe('eleang1 App', () => {
  let page: Eleang1Page;

  beforeEach(() => {
    page = new Eleang1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
