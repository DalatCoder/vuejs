const app = Vue.createApp({
  data() {
    return {
      websiteTitle: 'NTH Book Store',
      books: [
        {
          id: 1,
          title: '199 Mấy Hồi Ấy Làm Gì?',
          price: '83500',
          isFav: false,
          img: 'assets/1.jpg',
        },
        {
          id: 2,
          title: 'Muôn Kiếp Nhân Sinh 2',
          price: '186400',
          isFav: false,
          img: 'assets/2.jpg',
        },
        {
          id: 3,
          title: 'Cây Cam Ngọt Của Tôi',
          price: '74600',
          isFav: false,
          img: 'assets/3.jpg',
        },
        {
          id: 4,
          title: 'Vui Vẻ Không Quạu Nha - Tản Văn',
          price: '45900',
          isFav: false,
          img: 'assets/4.jpg',
        },
        {
          id: 5,
          title: 'Kiếp Nào Ta Cũng Tìm Thấy Nhau',
          price: '56000',
          isFav: false,
          img: 'assets/5.jpg',
        },
        {
          id: 6,
          title: 'Rèn Luyện Tư Duy Phản Biện',
          price: '61200',
          isFav: false,
          img: 'assets/6.jpg',
        },
        {
          id: 7,
          title:
            'Muốn Thành Công Nói Không Với Trì Hoãn – 21 Nguyên Tắc Vàng Đập Tan Sự Trì Hoãn',
          price: '62400',
          isFav: false,
          img: 'assets/7.jpg',
        },
        {
          id: 8,
          title: 'Nhà Đầu Tư Thông Minh (Tái Bản 2020)',
          price: '146.300',
          isFav: false,
          img: 'assets/8.jpg',
        },
        {
          id: 9,
          title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu (Tái Bản)',
          price: '58700',
          isFav: false,
          img: 'assets/9.jpg',
        },
        {
          id: 10,
          title: 'Mình Chỉ Là Người Bình Thường (Sách Tô Màu)',
          price: '85700',
          isFav: false,
          img: 'assets/10.jpg',
        },
      ],
      menus: [
        { id: 1, title: 'All', isSelected: true },
        { id: 2, title: 'Favorites', isSelected: false },
      ],
    }
  },
  methods: {
    toggleBookFav(book) {
      book.isFav = !book.isFav
    },
    handleMenuClick(menu) {
      this.menus.forEach((m) => (m.isSelected = false))
      menu.isSelected = true
    },
  },
  computed: {
    prepareData() {
      if (this.menus[0].isSelected) {
        return this.books
      } else if (this.menus[1].isSelected) {
        return this.books.filter((b) => b.isFav)
      }
    },
  },
})

app.mount('#app')
