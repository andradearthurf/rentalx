// criando um provider para trabalhar com datas. atualmente o projeto está trabalhando com
// dayjs, porém futuramente pode ser que queiramos utilizar outra lib, logo, é necessário
// um provider, para apenas trocar a lib de date.

interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  dateNow(): Date;
}

export { IDateProvider };
