import { type } from 'os';

export interface VersionAppDTO {
    major: number;
    minor: number;
    patch: number;
    revision: number;
    toString(): string;
    
}

export class VersionApp implements VersionAppDTO {
    major: number;
    minor: number;
    patch: number;
    revision: number;

    constructor(major: number, minor: number, patch?: number, revision?: number) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.revision = revision;
    }

    toString(): string {
        return `${this.isNumber(this.major) ? this.major: ''}${this.isNumber(this.minor) ? '.' + this.minor : ''}${this.isNumber(this.patch) ? '.' + this.patch : ''}${this.isNumber(this.revision) ? '.' + this.revision : ''}`;
    }

    isNumber(x: number): boolean {
        return typeof(x) === 'number';
    }
}

export const CRITICAL = 'critical'
export const ANNOYING = 'annoying'