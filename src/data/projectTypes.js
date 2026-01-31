/**
 * Project Types Data
 * Pre-defined project type options for the dropdown
 * Supports i18n with labelKey and descriptionKey
 */

export const projectTypes = [
  {
    id: 'webApp',
    value: 'webApp',
    labelKey: 'projectTypes.webApp',
    descriptionKey: 'projectTypes.webAppDesc',
    icon: 'Globe',
  },
  {
    id: 'mobileGame',
    value: 'mobileGame',
    labelKey: 'projectTypes.mobileGame',
    descriptionKey: 'projectTypes.mobileGameDesc',
    icon: 'Gamepad2',
  },
  {
    id: 'dataAnalysis',
    value: 'dataAnalysis',
    labelKey: 'projectTypes.dataAnalysis',
    descriptionKey: 'projectTypes.dataAnalysisDesc',
    icon: 'BarChart3',
  },
  {
    id: 'desktopApp',
    value: 'desktopApp',
    labelKey: 'projectTypes.desktopApp',
    descriptionKey: 'projectTypes.desktopAppDesc',
    icon: 'Monitor',
  },
  {
    id: 'api',
    value: 'api',
    labelKey: 'projectTypes.api',
    descriptionKey: 'projectTypes.apiDesc',
    icon: 'Server',
  },
  {
    id: 'aiMl',
    value: 'aiMl',
    labelKey: 'projectTypes.aiMl',
    descriptionKey: 'projectTypes.aiMlDesc',
    icon: 'Brain',
  },
  {
    id: 'ecommerce',
    value: 'ecommerce',
    labelKey: 'projectTypes.ecommerce',
    descriptionKey: 'projectTypes.ecommerceDesc',
    icon: 'ShoppingCart',
  },
  {
    id: 'iot',
    value: 'iot',
    labelKey: 'projectTypes.iot',
    descriptionKey: 'projectTypes.iotDesc',
    icon: 'Cpu',
  },
  {
    id: 'blockchain',
    value: 'blockchain',
    labelKey: 'projectTypes.blockchain',
    descriptionKey: 'projectTypes.blockchainDesc',
    icon: 'Link',
  },
  {
    id: 'contentPlatform',
    value: 'contentPlatform',
    labelKey: 'projectTypes.contentPlatform',
    descriptionKey: 'projectTypes.contentPlatformDesc',
    icon: 'FileText',
  },
  {
    id: 'automation',
    value: 'automation',
    labelKey: 'projectTypes.automation',
    descriptionKey: 'projectTypes.automationDesc',
    icon: 'Zap',
  },
  {
    id: 'other',
    value: 'other',
    labelKey: 'projectTypes.other',
    descriptionKey: 'projectTypes.otherDesc',
    icon: 'Box',
  },
];

/**
 * Get project type by value
 * @param {string} value - Project type value
 * @returns {Object|undefined} Project type object
 */
export const getProjectTypeByValue = (value) => {
  return projectTypes.find(type => type.value === value);
};

/**
 * Get default project type
 * @returns {Object} Default project type
 */
export const getDefaultProjectType = () => {
  return projectTypes[0]; // webApp as default
};
