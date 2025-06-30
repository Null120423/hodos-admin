import { useMemo } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string, data?: any) => {
        navigate(href, { replace: false, state: data });
      },
      replace: (href: To, options?: NavigateOptions | undefined) =>
        navigate(href, { replace: true, ...options }),
    }),
    [navigate],
  );

  return router;
}
