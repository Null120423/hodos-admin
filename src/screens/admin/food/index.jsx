import MainLayout from "../../../layouts/layout";
import FoodTableManager from "./components/food-table";
import FoodCreate from "./components/food-create";
const FoodScreen = () => {
    return (
        <MainLayout>
          <FoodCreate/>
          <FoodTableManager/>
        </MainLayout>
    );
}
export default FoodScreen;