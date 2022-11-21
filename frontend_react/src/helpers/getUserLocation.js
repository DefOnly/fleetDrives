export const getUserLocation = async() => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                resolve([coords.longitude, coords.latitude]);
            },
            (error) => {
                alert("No se puede obtener la geolicalización");
                console.log(error);
                reject();
            }
        )
    });
} 