export enum ErrorIDText {
    SERVER = 'SERVER',
    NO_RESULTS = 'NO_RESULTS',
    GENERIC = 'GENERIC',
    NOT_GRADES = 'NOT_GRADES',
    NO_OPEN_EXPEDIENT = 'NO_OPEN_EXPEDIENT',
    NO_SCHEDULE = 'NO_SCHEDULE',
    SCHEDULE = 'SCHEDULE',
    SCHEDULE_NOT_ENROLLMENT = 'SCHEDULE_NOT_ENROLLMENT',
    RESTRICTED = 'RESTRICTED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    PWD_WRONG = 'PWD_WRONG',
    PERMISSION_DENIED = 'PERMISSION_DENIED',
    WIP = 'WIP',
    SITE = 'SITE',
    INTERNET = 'INTERNET',
    NO_EVENTS = 'NO_EVENTS',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
}

export enum ErrorIDImage {
    ERROR_GENERAL = 'error-general.png',
    NO_INTERNET = 'no-conexion.png',
    NOT_AUTHORIZED = 'acceso-restringido.png',
    NO_SERVER = 'no-server.png',
    WIP = 'wip.png',
    NO_INFORMATION = 'no-informacion.png',
    NO_GRADES = 'no-notas.png',
    NO_EXPEDIENT = 'sin-expediente.png',
    NO_RESULTS = 'no-resultados.png',
    NO_EVENTS = 'no-eventos.png',
    UNDER_MAINTENANCE = 'mantenimiento.png',
}
export const ApiErrors = {
    GENERAL_NO_INTERNET_CONNECTION: {
        errorCodeApp: {
            code: 10601,
            image: ErrorIDImage.NO_INTERNET,
            text: ErrorIDText.INTERNET
        }
    },
    SCHOLARSHIPS_SEARCH_NO_RESULTS: {
        errorCodeApp: {
            code: 63602,
            image: ErrorIDImage.NO_RESULTS,
            text: ErrorIDText.NO_RESULTS,
        }
    },
    LIBRARIES_SEARCH_NO_RESULTS: {
        errorCodeApp: {
            code: 66602,
            image: ErrorIDImage.NO_RESULTS,
            text: ErrorIDText.NO_RESULTS,
        }
    },
    SCHOOLS_SEARCH_NO_RESULTS: {
        errorCodeApp: {
            code: 69602,
            image: ErrorIDImage.NO_RESULTS,
            text: ErrorIDText.NO_RESULTS,
        }
    },
    LOGIN_PERMISSION_DENIED: {
        errorCodeApp: {
            code: 21604,
            image: ErrorIDImage.NO_EXPEDIENT,
            text: ErrorIDText.PERMISSION_DENIED,
        }
    },
    WIP: {
        errorCodeApp: {
            code: 21601,
            image: ErrorIDImage.WIP,
            text: ErrorIDText.WIP,
        }
    },
    NO_EVENTS: {
        errorCodeApp: {
            code: 65603,
            image: ErrorIDImage.NO_EVENTS,
            text: ErrorIDText.NO_SCHEDULE,
        }
    },
    SCHEDULE_INTERNAL_SERVER_ERROR: {
        code: 61500,
        image: ErrorIDImage.NO_SERVER,
        text: ErrorIDText.SERVER,
    },
    GENERAL_INTERNAL_SERVER_ERROR: {
        code: 10500,
        image: ErrorIDImage.NO_SERVER,
        text: ErrorIDText.INTERNAL_SERVER_ERROR,
    },
    GENERAL_UNDER_MAINTENANCE: {
        code: 10666,
        image: ErrorIDImage.UNDER_MAINTENANCE,
        text: ErrorIDText.UNDER_MAINTENANCE,
    }
}
