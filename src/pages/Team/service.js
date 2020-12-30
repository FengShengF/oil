import request from '@/utils/request';

export async function getTeamList() {
    return request(`/team/list`);
}

export async function updateTeamDetail(params) {
    return request(`/team/update`, {
        method: 'PUT',
        data: params,
    });
}

export async function deleteTeamServer(params) {
    return request(`/team/delete/${params.id}`, {
        method: 'DELETE',
    });
}

export async function addTeamDetail(params) {
    return request(`/team/add`, {
        method: 'POST',
        data: params,
    });
}
