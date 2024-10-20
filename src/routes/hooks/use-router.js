import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href, data) => {
        navigate(href, { replace: false }, { state: data });
      },
      replace: (href, options) => navigate(href, { replace: true, ...options }),
    }),
    [navigate],
  );

  return router;
}
