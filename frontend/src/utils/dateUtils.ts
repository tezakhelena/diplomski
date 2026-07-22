import moment, { Moment } from 'moment';

export const formatDate = (value: Moment | string) => {
    return moment(value).format('DD.MM.YYYY');
}

export function formatMomentDate(date: string | Moment): string {
    const momentDate = moment.isMoment(date) ? date : moment(date);
    return momentDate.format('DD.MM.YYYY. HH:mm:ss');
}