import { TYearConfig } from "../types";
import { denseToEventKey2024, eventKeyToDense2024, eventKeys2024 } from "../types/2024";

export const yearConfig: (version: string) => TYearConfig = (version: string): TYearConfig => {

    const year = version.substring(0, 4);

    switch(year) {
        case '2024': 
        return {
            denseToEventKey: denseToEventKey2024,
            eventKeyToDense: eventKeyToDense2024,
            eventKeys: eventKeys2024
        }
    }

    throw new Error(`Year ${year} is not supported`);
}