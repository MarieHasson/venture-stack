import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ProjectName = () => {
  const {
    siteConfig: {
      customFields: { projectName = 'VentureStack' },
    },
  } = useDocusaurusContext();

  return projectName;
};

export default ProjectName;
