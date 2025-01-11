const Footer = () => {
  return (
    <div className="bg-[#032541] flex justify-center py-4 gap-10">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        alt=""
        width={100}
      />
      <div className="">
        <p className="text-white text-lg">
          Advanced Web Application Development - CQ2021/3
        </p>
        <p className="text-white">Group</p>
        <ul>
          <li className="text-white text-sm">21120552 - Nguyễn Đức Nhật Tân</li>
          <li className="text-white text-sm">21120 - Triệu Hoàng Thiên Ân</li>
          <li className="text-white text-sm">21120 - Lê Minh Huy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
