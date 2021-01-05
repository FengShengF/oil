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

export async function getMenuList(params) {
    return request(`/roleMenu/getMenuList/${params.id}`);
}

export async function addRoleMenu(params) {
    return request(`/roleMenu/addList`, {
        method: 'POST',
        data: params,
    });
}

export async function deleteRoleMenu(params) {
    return request(`/roleMenu/deleteList`, {
        method: 'DELETE',
        data: params,
    });
}

