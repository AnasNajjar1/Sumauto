interface AutobizHour {
    id: string | null;
    hour: number;
    status: 1 | 0;
}

interface AutobizDay {
    date: string;
    hours: AutobizHour[];
}

export interface AutobizSlotDto {
    networkId: string;
    dealerId: string;
    name: string;
    city: string;
    adress: string;
    startHour: string;
    endHour: string;
    startBreak: string;
    endBreak: string;
    slots: AutobizDay[];
}

// const test: SlotDto = {
//     networkId: '439090',
//     dealerId: '439090',
//     name: 'SALA HERMANOS ALICANTE',
//     city: 'ALICANTE',
//     adress: 'AVENIDA DENIA 147',
//     startHour: '0900',
//     endHour: '2000',
//     startBreak: '1300',
//     endBreak: '1500',
//     slots: [
//         {
//             date: '2021-08-25',
//             hours: [
//                 {
//                     id: '16956',
//                     hour: 9,
//                     status: 0,
//                 },
//                 {
//                     id: '16957',
//                     hour: 10,
//                     status: 0,
//                 },
//                 {
//                     id: null,
//                     hour: 11,
//                     status: 1,
//                 },
//                 {
//                     id: '16959',
//                     hour: 12,
//                     status: 0,
//                 },
//                 {
//                     id: null,
//                     hour: 13,
//                     status: 1,
//                 },
//                 {
//                     id: null,
//                     hour: 14,
//                     status: 1,
//                 },
//                 {
//                     id: '16962',
//                     hour: 15,
//                     status: 0,
//                 },
//                 {
//                     id: '16963',
//                     hour: 16,
//                     status: 0,
//                 },
//                 {
//                     id: '16964',
//                     hour: 17,
//                     status: 0,
//                 },
//                 {
//                     id: '17005',
//                     hour: 18,
//                     status: 0,
//                 },
//                 {
//                     id: null,
//                     hour: 19,
//                     status: 1,
//                 },
//             ],
//         },
//     ],
// };
