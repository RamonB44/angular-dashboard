export class UserSettings {
  layout: Object;
  theme: Object;
  customScrollbars: boolean;

  constructor(layout: Object, theme: Object, customScrollbars: boolean) {
    this.layout = layout;
    this.theme = theme;
    this.customScrollbars = customScrollbars;
  }

  getLayout(): Object {
    return this.layout;
  }

  setLayout(layout: Object): void {
    this.layout = layout;
  }

  getTheme(): Object {
    return this.theme;
  }

  setTheme(theme: Object): void {
    this.theme = theme;
  }

  getCustomScrollbars(): boolean {
    return this.customScrollbars;
  }

  setCustomScrollbars(customScrollbars: boolean): void {
    this.customScrollbars = customScrollbars;
  }
}
