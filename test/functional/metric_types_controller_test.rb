require 'test_helper'

class MetricTypesControllerTest < ActionController::TestCase
  setup do
    @metric_type = metric_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:metric_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create metric_type" do
    assert_difference('MetricType.count') do
      post :create, metric_type: {  }
    end

    assert_redirected_to metric_type_path(assigns(:metric_type))
  end

  test "should show metric_type" do
    get :show, id: @metric_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @metric_type
    assert_response :success
  end

  test "should update metric_type" do
    put :update, id: @metric_type, metric_type: {  }
    assert_redirected_to metric_type_path(assigns(:metric_type))
  end

  test "should destroy metric_type" do
    assert_difference('MetricType.count', -1) do
      delete :destroy, id: @metric_type
    end

    assert_redirected_to metric_types_path
  end
end
