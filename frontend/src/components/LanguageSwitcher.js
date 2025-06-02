import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language || 'en';

  return (
    <Dropdown align="end" className="ms-3">
      <Dropdown.Toggle variant="secondary" size="sm" id="language-dropdown">
        {currentLang.toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('fr')}>French</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('es')}>Spanish</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('de')}>German</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
