

import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchProject = (projectId: number | null | string, reset: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [project, setCompany] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/v2/admin/project/${projectId}`);
      const fetchedProject = res.data.data;
      // Safely handle `propertyHostedBy`
      const propertyHostedBy = fetchedProject?.propertyHostedBy || {};
      const logoFile = propertyHostedBy.logo || null;
      reset({
        ...fetchedProject,
        llp_company: fetchedProject.llp_company?.toString(),
        propertyHostedBy: {
          ...propertyHostedBy,
          logo: null,
          logo_file: logoFile,
        },
        property_type_id: fetchedProject?.property_type_id.toString(),
        feature_image: '',
        feature_image_file: fetchedProject.feature_image,
        'hosted_by.logo_file': fetchedProject?.hosted_by?.logo || null,
      });
      setCompany(fetchedProject);
    } catch (err: any) {
      const message =
        err.response?.data?.error?.[0]?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId === null) return;
    fetchProjectData();
  }, [projectId]);

  return { project, loading, error, refetch: fetchProjectData };
};

export default useFetchProject;
