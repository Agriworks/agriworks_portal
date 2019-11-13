<link href="https://unpkg.com/bootstrap-table@1.15.5/dist/bootstrap-table.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/bootstrap-table@1.15.5/dist/bootstrap-table.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.15.5/dist/bootstrap-table-vue.min.js"></script>
<template>
    <div id="table">
        <bootstrap-table :columns="columns" :data="data" :options="options"></bootstrap-table>
</div>
</template>
<script>
export default {
    name: "Table",

}
$(function() {
    new Vue({
      el: '#table',
      components: {
        'BootstrapTable': BootstrapTable
      },
      data: {
        columns: [
          {
            field: 'state',
            checkbox: true
          },
          {
            title: 'Item ID',
            field: 'id'
          },
          {
            field: 'name',
            title: 'Item Name'
          },
          {
            field: 'price',
            title: 'Item Price'
          },
          {
            field: 'action',
            title: 'Actions',
            align: 'center',
            formatter: function () {
              return '<a href="javascript:" class="like"><i class="fa fa-star"></i></a>'
            },
            events: {
              'click .like': function (e, value, row) {
                alert(JSON.stringify(row))
              }
            }
          }
        ],
        data: [
          {
            id: 0,
            name: 'Item 0',
            price: '$0'
          },
          {
            id: 1,
            name: 'Item 1',
            price: '$1'
          },
          {
            id: 2,
            name: 'Item 2',
            price: '$2'
          },
          {
            id: 3,
            name: 'Item 3',
            price: '$3'
          },
          {
            id: 4,
            name: 'Item 4',
            price: '$4'
          },
          {
            id: 5,
            name: 'Item 5',
            price: '$5'
          }
        ],
        options: {
          search: true,
          showColumns: true
        }
      }
    })
  })
</script>
<style scoped>

</style>