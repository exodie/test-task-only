/// <reference types="vite/client" />

declare module "*.module.scss" {
  const styles: { [key: string]: string };
  export default styles;
}
