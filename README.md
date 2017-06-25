# Project - *Women's Fashion*

**Women's Fashion** là repository cho đồ án nhóm. Nhóm tối đa 4 thành viên. 

Thành viên:
* [x] **1312071** Nguyễn Thị Diệu (1312071)
* [x] **1312169** Nguyễn Mạnh Hải (Mango95)
* [x] **1312632** Cao Tiến Trung (CaoTrung)
* [x] **1312660** Lê Trọng Tuấn (1312660)

URL: **https://secure-tor-10262.herokuapp.com/**

## Yêu cầu

Trong đề tài, sinh viên cần mô tả các chức năng có thể thực hiện bên dưới. Sinh viên check vào các mục bên dưới và ghi mã sinh viên đã làm vào chức năng theo mẫu. Mục nào ko có MSSV là tính điểm theo nhóm. Cần sắp xếp các chức năng bên dưới theo thứ tự MSSV đã thực hiện.

Làm việc nhóm:
* [x] Có sử dụng GIT.
* [x] Sử dụng GIT theo Centralized Workflow.
* [x] Sử dụng GIT theo Feature Branch Workflow.
* [x] Sử dụng GIT theo Gitflow Workflow.

## Mô tả nghiệp vụ chung ứng dụng
-Giới thiệu trang web:Không cần bạn mất thời gian đi đến cửa hàng, bạn chỉ cần ở nhà và vài cái nhấp chuột bạn đã có thể diện một bộ đồ đẹp và hợp thời trang nhất hiện nay. Hãy đến với trang web Women's Fashion của chúng tôi.Chúng tôi cung cấp cho quý khách hàng nữ các bộ đồ hợp thời trang đi kèm với đó là các bộ phụ kiện trang sức luôn mới theo xu hướng phát triển của thời trang trong nước.
-Nghiệp vụ:
  . Nếu người dùng lần đầu tiên thăm trang web, thì người dùng phải đăng kí tài khoản.
  . Sau khi đăng kí tài khoản thành công, người dùng có thể đăng nhập vào trang web.
  . Nếu người dùng có sử dụng mạng xã hội face book, người dùng có thể bỏ qua bước đăng ký tài khoản và login vào trang web bằng tài khoản facebook của cá nhân.
  . Trang web thể hiện các sản phẩm mới nhất là shop đang có.
  . Người dùng có thể mua, và xem các sản phẩm mà người dùng muốn mua ở giở hàng.
  . Có chức năng search để tìm kiếm sản phẩm.
  . Có thiết kế trang dashboard admin để quản lý cơ sở dữ liệu.
  . Các phần cài đặt trong phần dashboard admin:
    + Insert/Update/Delete/Search merchandise
    + Insert/Update/Delete/Search promotions
    + Insert/Update/Delete/Search users 
    + Insert/Update/Delete/Search categories
  . Ở trang dashboard admin: nếu admin chưa đăng nhập thì sẽ không vào được trang chủ của daschboard. Kiểm tra trên đường truyền. Nếu chưa đăng nhập thì 1 người dùng ngoài khi truy cập đường link ví dụ như http://localhost:3000/admin/categories sẽ không truy cập được vào trang admin.  
## Lập trình server
### MVC
* [x] MVC
* [x] Config
* [x] REST routing
* [ ] Layout & partial (MSSV1)

### Lập trình dữ liệu
* [x] Thêm
* [x] Xóa
* [x] Sửa 
* [x] Tìm kiếm (1312071 - 1312660)

### Xử lý lỗi
* [x] Xử lý lỗi trong cùng trang web (MSSV1)
* [x] Xử lý lỗi dùng trang web riêng (MSSV1)
   * [ ] 401 (MSSV1)
   * [x] 404 (1312071)
   * [ ] 500 (MSSV1)

### Tương tác API khác
Liệt kê các API nhóm đã sử dụng được ở đây
* [x] Facebook API: mô tả (1312169)
* [ ] Google API: mô tả (MSSV1)
* [ ] ...

## Lập trình client
* [x] Kiểm tra dữ liệu
* [ ] Animation (MSSV1)
* [x] Thao tác DOM 
* [x] AJAX(1312071 - 1312660)

## Bảo mật
* [ ] Chứng thực (MSSV1)
* [ ] Phân quyền sử dụng một số trang web với nhiều vai trò khác nhau (MSSV1)
   * [x] Không cho phép thao tác vào trang admin khi không có quyền (1312660)
   * [ ] Thể hiện các chức năng khác nhau trên cùng giao diện khi người dùng có quyền khác nhau (MSSV1)
   * [ ] Thể hiện lỗi khi không truy xuất được trang khi không có quyền (MSSV1)

## Nâng cao
* [x] Filter categories trong daschboard admin.(1312071)
* [x] Filter promotions trong daschboard admin.(1312660)
## Chức năng đã thực hiện
Các **yêu cầu chức năng** (check và ghi MSSV vào các phần chức năng đã thực hiện)
* [x] Website layout theo kiến trúc MVC với các thành phần được tách thành nhiều module theo hướng dẫn.
* [x] Trang web được thiết kế sẽ bao gồm các trang: home, product, about us. mail us.
* [x] Thiết kế trang web theo responsive với bootstrap với header (navigation bar, logo), left menu, footer và content. 
* [x] Quản lý các thay đổi trong cơ sở dữ liệu (sử dụng db-migrate)
Phân hệ admin:
* [x] Đăng nhập vào trang quản lý admin bằng email và password(1312660)
* [x] Đăng xuất khỏi trang admin(1312660)
* [x] Ở trang dashboard admin cho phép người dùng biết họ đang ở trang nào (sử dụng breadcrumb, highlight navigation bar,...)(1312660)
* [x] Cài đặt các chức năng thêm, xóa, sửa dữ liệu ở mục promotions trong trang admin(1312660)
* [x] Bắt buộc đăng nhập vào trang admin, thì mới được phép vào trang chủ admin(1312660)
* [x] Cài đặt các chức năng thêm, xóa, sửa dữ liệu ở mục merchandise trong trang admin(1312071)
* [x] Cài đặt các chức năng xem, xóa dữ liệu ở mục users trong trang admin(1312071)
* [x] Cài đặt các chức năng thêm, xóa, sửa dữ liệu ở mục categories trong trang admin(1312071)
Phân hệ user và guest:
* [x] Đăng ký tài khoản(1312660)
* [x] Đăng nhập bằng email và password(1312632)
* [x] Đăng xuất tài khoản khi người dùng đăng nhập(1312632)
* [x] Đăng nhập bằng tài khoản facebook(1312169)
* [x] Trang about thể hiện thông tin nhóm thực hiện đề tài(1312169)
* [x] Thể hiện thông tin sản phẩm lên trang web(1312071)
* [x] Filter sản phẩm theo category(1312071)
* [x] Cho phép người dùng thêm sản phẩm vào giỏ hàng và xem các sản phẩm đã chọn trong giỏ hàng(1312071).

## Demo

Link ảnh GIF demo ứng dụng:

![Video Walkthrough](demo.gif)

Tạo ảnh GIF với chương trình [LiceCap](http://www.cockos.com/licecap/).


## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
