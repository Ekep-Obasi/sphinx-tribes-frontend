import { useEffect, useState } from 'react';

const constructTabTitle = (tabTitle: string) => `${tabTitle} - Sphinx Community`;

export const useBrowserTab = () => {
  const [tabTitle, setTabTitle] = useState<string>('');

  const setTitle = (tabName: string) => {
    setTabTitle(constructTabTitle(tabName));
  };

  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]);

  return { setTitle };
};
