export interface IEmployee {
    id?: number;
    username: string;
    fullName: string;
    role: 'ROLE_ADMIN' | 'ROLE_BRIGADIER' | 'ROLE_EMPLOYEE';
    enabled?: boolean;
    password?: string;
}

export interface IState {
    content: IEmployee[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}

export const ROLES = [
    { value: 'ROLE_EMPLOYEE', title: 'Рядовой сотрудник' },
    { value: 'ROLE_BRIGADIER', title: 'Бригадир' },
    { value: 'ROLE_ADMIN', title: 'Администратор' },
];
