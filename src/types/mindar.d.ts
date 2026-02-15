// Type declarations for MindAR dynamic import
declare module 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js' {
    export class MindARThree {
        constructor(config: {
            container: HTMLElement;
            imageTargetSrc: string;
        });
        renderer: any;
        scene: any;
        camera: any;
        addAnchor(index: number): any;
        start(): Promise<void>;
        stop(): void;
    }
}
