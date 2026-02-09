
declare module 'pdf-parse' {
    interface PdfParseOptions {
        pagerender?: (pageData: any) => string;
        max?: number;
        version?: string;
    }

    interface PdfParseResult {
        numpages: number;
        numrender: number;
        info: any;
        metadata: any;
        text: string;
        version: string;
    }

    function PdfParse(dataBuffer: Buffer, options?: PdfParseOptions): Promise<PdfParseResult>;
    export = PdfParse;
}

declare module 'mammoth' {
    export interface MammothResult {
        value: string;
        messages: any[];
    }

    export interface MammothOptions {
        buffer: Buffer;
    }

    export function extractRawText(options: MammothOptions): Promise<MammothResult>;
}
