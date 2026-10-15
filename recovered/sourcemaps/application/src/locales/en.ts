export const getTranslationEN = () => {
  // NOTE: production 환경(electron packaged 환경)에서는 애플리케이션 폴더 바깥 참조가 어렵기 때문에
  // locale package 를 copy 해온 모듈을 사용한다.
  if (import.meta.env.PROD) {
    return import('./dist/en/common.json');
  }

  // 개발 환경의 경우 locales package 를 직접 참조하여 vite hmr 를 사용한다.
  return import('../../../../packages/locales/src/en/common.json');
};
