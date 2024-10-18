import { Button } from "rsuite";
import { ADMIN_ROUTES } from "../../../routes/endpoint";
import { useRouter } from "../../../routes/hooks/use-router";

function BlogManagerScreen() {
    const router = useRouter()
    return <><Button onClick={() => router.push(ADMIN_ROUTES.BLOG_MANAGER_CREATE)} >create</Button></>
}

export default BlogManagerScreen;