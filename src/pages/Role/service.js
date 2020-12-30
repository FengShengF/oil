import request from '@/utils/request';

export async function getRoleList() {
    return request(`/role/list`);
}

export async function updateRoleDetail(params) {
    return request(`/role/update`, {
        method: 'PUT',
        data: params,
    });
}

export async function deleteRoleServer(params) {
    return request(`/role/delete/${params.id}`, {
        method: 'DELETE',
    });
}

export async function addRoleDetail(params) {
    return request(`/role/add`, {
        method: 'POST',
        data: params,
    });
}
