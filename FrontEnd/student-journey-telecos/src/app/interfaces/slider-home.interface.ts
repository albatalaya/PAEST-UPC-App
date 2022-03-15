export interface SliderHomeDTO {
    id: string;
    slides: SlideDTO[];
}

export interface SlideDTO {
    title: string;
    icon: string;
    pack: string;
    image: string;
    link: string;
    visibility: boolean;
    startDate?: Date;
    endDate?: Date;
}