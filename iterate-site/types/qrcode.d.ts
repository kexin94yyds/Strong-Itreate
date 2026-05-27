declare module 'qrcode' {
  interface QRCodeOptions {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  function toCanvas(
    text: string,
    options: QRCodeOptions,
    callback: (error: unknown, canvas: HTMLCanvasElement) => void
  ): void;

  export default { toCanvas };
}
