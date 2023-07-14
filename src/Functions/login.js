export default function login(login, password) {
    if (!login || !password) {
        return Promise.reject('Отсутствует логин или пароль');
    }

    const params = new URLSearchParams();
    params.set('login', login);
    params.set('password', password);

    return fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        body: params,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('expire', res.expire);
            localStorage.setItem('login', login);
            window.dispatchEvent(new StorageEvent("storage", {
            }));

            return fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${res.accessToken}`,
                },
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }
            });
        })
        .then((data) => {
            localStorage.setItem('limitCompany', data.eventFiltersInfo.companyLimit);
            localStorage.setItem('usedCompany', data.eventFiltersInfo.usedCompanyCount);
            window.dispatchEvent(new StorageEvent("storage", {
            }));
        })
        .catch((error) => {
            return
        });
}
