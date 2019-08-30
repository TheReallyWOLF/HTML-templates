Vue.component('tree-item', {
    template: '#item-template',
    props: {
        item: Object
    },
    data: function () {
        return {
            isOpen: false,
            showItems: {}
        }
    },
    computed: {
        isFolder: function () {
            return this.item.children &&
                this.item.children.length
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen
            }
        },
        makeFolder: function () {
            if (!this.isFolder) {
                this.$emit('make-folder', this.item)
                this.isOpen = true
            }
        }
    }
});

var demo = new Vue({
    el: '#demo',
    data: {
        treeData: {},
        selectedItems: [],
        showSelected: false
    },
    methods: {
        makeFolder: function (item) {
            Vue.set(item, 'children', [])
            this.addItem(item)
        },
        makeList: function(items, filterObj){
            for(var i = 0; i < items.length; i++){
                if(!items[i].parent_id){
                    filterObj.children = [];
                    filterObj.title = items[i].title;
                    filterObj.parentId = items[i].parent_id;
                    filterObj.unchanged = items[i].unchanged;
                    filterObj.id = items[i].id;
                    filterObj.srt = items[i].srt;
                }else{
                    this.findItemInArray(items[i], filterObj)
                }
            }
            Vue.set(filterObj, 0, this.compare(filterObj));
            
        },
        findItemInArray: function(item, array){
            if(!item.children){
                item.children = [];
            }
            if(!this.findInnerParent(item, array)){
                for (var i = 0; i < array.children.length; i++) {
                    if(array.children[i].id == item.parent_id){
                        item.children = [];
                        array.children[i].children.push(item);
                    }else{
                        this.findItemInArray(item, array.children[i]);
                    }
                }
            }
        },
        findInnerParent: function(item, array){
            if(array.id == item.parent_id){
                item.children = [];
                array.children.push(item);
                return true;
            }
        },
        compareParent: function(a, b) {
            const itemA = a.parent_id;
            const itemB = b.parent_id;

            let comparison = 0;
            if (itemA > itemB) {
            comparison = 1;
            } else if (itemA < itemB) {
            comparison = -1;
            }
            return comparison;
        },
        compare: function(elem){
            if(!elem.length){
                if(elem.children){
                    elem.children.sort(this.compareSRT);
                    this.compare(elem.children)
                }
            }else{
                for(var i = 0; i < elem.length; i++){
                    if(elem[i].children){
                        elem[i].children.sort(this.compareSRT);
                        this.compare(elem[i].children)
                    }
                }
            }
        },
        compareSRT: function(a, b){
            const itemA = a.srt;
            const itemB = b.srt;

            let comparison = 0;
            if (itemA > itemB) {
            comparison = 1;
            } else if (itemA < itemB) {
            comparison = -1;
            }
            return comparison;
        }

    },
    beforeCreate: function () {
        axios.get('https://rcslabs.ru/locations.json')
            .then(res => {
                this.makeList(res.data.sort(this.compareParent), this.treeData)
            });
    }
});
