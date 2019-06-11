const configureApplication = (): Promise<boolean> => {
  return new Promise(
    (res, rej): void => {
      if (navigator && 'serviceWorker' in navigator) {
        window.addEventListener(
          'load',
          (): void => {
            navigator.serviceWorker
              .register('/service-worker.js')
              .then(
                (registration): void => {
                  console.log('Service Worker registered.', registration);
                  res(true);
                },
              )
              .catch(
                (e): void => {
                  console.error('Service Worker could not be registered.', e);
                  rej(e);
                },
              );
          },
        );
      }
    },
  );
};

export default configureApplication;
