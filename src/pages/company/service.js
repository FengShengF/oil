import request from '@/utils/request';
// import { stringify } from 'qs';

export async function getCompanyList() {
    return request(`/company/list`);
}

export async function updateCompanyDetail(params) {
    return request(`/company/update`, {
        method: 'PUT',
        data: params,
    });
}

export async function deleteCompanyServer(params) {
    return request(`/company/delete/${params.id}`, {
        method: 'DELETE',
    });
}

export async function addCompanyDetail(params) {
    return request(`/company/add`, {
        method: 'POST',
        data: params,
    });
}
