export default {
  computed: {
    isDisabled() {
      return (
        this.form.product_name <= 0 ||
        this.form.product_price <= 0 ||
        this.form.product_status <= 0 ||
        this.form.category_id <= 0
      )
    }
  }
}
