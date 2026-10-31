let athletes = [
  {
    athleteCode: "ATH-001",
    fullname: "Lâm Văn Hải",
    sport: "Bóng đá",
    age: 21,
    jerseyNumbers: 10,
  },
  {
    athleteCode: "ATH-002",
    fullname: "Tạ Minh Thư",
    sport: "Bóng chuyền",
    age: 19,
    jerseyNumbers: 7,
  },
  {
    athleteCode: "ATH-003",
    fullname: "Đinh Công Phát",
    sport: "Bóng đá",
    age: 24,
    jerseyNumbers: 9,
  },
];

// *****CASE 1

function normalizeAthleteCode(code) {
  return code.trim().toUpperCase();
}

function findAthleteIndex(code) {
  return athletes.findIndex(function (athlete) {
    return athlete.athleteCode === code;
  });
}

function capitalizeWords(text) {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("vi-VN")
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toLocaleUpperCase("vi-VN") + word.slice(1);
    })
    .join(" ");
}

// Hiển thị danh sách vận động viên
function displayAthletes(list) {
  if (list.length === 0) {
    console.log("Danh sách vận động viên trống");
    return;
  }

  console.log("========== DANH SÁCH VẬN ĐỘNG VIÊN ==========");

  list.forEach(function (athlete, index) {
    console.log(
      `${index + 1}. ${athlete.athleteCode} - ` +
        `${athlete.fullname} - ${athlete.sport}`,
    );

    console.log(`   Tuổi: ${athlete.age} | Số áo: ${athlete.jerseyNumbers}`);
  });

  console.log("-----------------------------------------");
  console.log(`Tổng: ${list.length} vận động viên`);
}

// Hiển thị danh sách
function showAthletes() {
  displayAthletes(athletes);
}

//  ***CASE 2

// Kiểm tra mã vận động viên
function validateAthleteCode(code) {
  if (code === "") {
    return "Lỗi: Chưa nhập mã vận động viên";
  }

  if (code.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }

  if (!code.startsWith("ATH-")) {
    return 'Lỗi: Sai tiền tố "ATH-"';
  }

  if (/\s/.test(code)) {
    return "Lỗi: Chứa khoảng trắng";
  }

  if (findAthleteIndex(code) !== -1) {
    return "Lỗi: Mã vận động viên đã tồn tại";
  }

  return "";
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    input = input.trim();

    if (input === "" || !/^\d+$/.test(input)) {
      console.log("Lỗi: Vui lòng nhập số nguyên!");
      continue;
    }

    let number = Number(input);

    if (number < min || number > max) {
      console.log(`Lỗi: Giá trị phải từ ${min} đến ${max}!`);
      continue;
    }

    return number;
  }
}

// Nhập họ tên hoặc môn thi đấu
function inputText(message) {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    input = input.trim().replace(/\s+/g, " ");

    if (input === "") {
      console.log("Lỗi: Không được để trống!");
      continue;
    }

    return capitalizeWords(input);
  }
}

// Thêm vận động viên
function addAthletes() {
  console.log("========== THÊM VẬN ĐỘNG VIÊN ==========");

  // Nhập mã vận động viên
  let code = prompt("Nhập mã vận động viên:");

  if (code === null) {
    console.log("Đã hủy thao tác thêm!");
    return;
  }

  code = normalizeAthleteCode(code);

  let error = validateAthleteCode(code);

  if (error !== "") {
    console.log(error);
    return;
  }

  // Nhập họ tên
  let fullname = inputText("Nhập họ tên:");

  if (fullname === null) {
    console.log("Đã hủy thao tác thêm!");
    return;
  }

  // Nhập môn thi đấu
  let sport = inputText("Nhập môn thi đấu:");

  if (sport === null) {
    console.log("Đã hủy thao tác thêm!");
    return;
  }

  // Nhập tuổi
  let age = inputIntegerInRange("Nhập tuổi (15 - 40):", 15, 40);

  if (age === null) {
    console.log("Đã hủy thao tác thêm!");
    return;
  }

  // Nhập số áo
  let jerseyNumbers = inputIntegerInRange("Nhập số áo (1 - 99):", 1, 99);

  if (jerseyNumbers === null) {
    console.log("Đã hủy thao tác thêm!");
    return;
  }

  // Thêm vào cuối danh sách
  let newAthlete = {
    athleteCode: code,
    fullname: fullname,
    sport: sport,
    age: age,
    jerseyNumbers: jerseyNumbers,
  };

  athletes.push(newAthlete);

  console.log("Thêm vận động viên thành công!");

  console.log("Thông tin vận động viên vừa thêm:");

  displayAthletes([newAthlete]);
}

//  ****CASE 3

// Cập nhật thông tin vận động viên
function updateAthletes() {
  console.log("========== CẬP NHẬT VẬN ĐỘNG VIÊN ==========");

  let code = prompt("Nhập mã vận động viên cần cập nhật:");

  if (code === null) {
    console.log("Đã hủy thao tác cập nhật!");
    return;
  }

  code = normalizeAthleteCode(code);

  // Tìm vận động viên
  let index = findAthleteIndex(code);

  if (index === -1) {
    console.log(`Không tìm thấy vận động viên có mã ${code}`);
    return;
  }

  let athlete = athletes[index];

  let oldAge = athlete.age;
  let oldJersey = athlete.jerseyNumbers;

  console.log("Thông tin hiện tại:");
  console.log(`Tuổi: ${oldAge}`);
  console.log(`Số áo: ${oldJersey}`);

  let newAge = inputIntegerInRange("Nhập tuổi mới (15 - 40):", 15, 40);

  if (newAge === null) {
    console.log("Đã hủy cập nhật!");
    return;
  }

  let newJersey = inputIntegerInRange("Nhập số áo mới (1 - 99):", 1, 99);

  if (newJersey === null) {
    console.log("Đã hủy cập nhật!");
    return;
  }

  athlete.age = newAge;
  athlete.jerseyNumbers = newJersey;

  console.log("Cập nhật thành công!");

  console.log("Thông tin trước cập nhật:");
  console.log(`Tuổi: ${oldAge} | Số áo: ${oldJersey}`);

  console.log("Thông tin sau cập nhật:");
  console.log(`Tuổi: ${athlete.age} | Số áo: ${athlete.jerseyNumbers}`);
}

// ******CASE 4

// Xóa vận động viên
function deleteAthletes() {
  console.log("========== XÓA VẬN ĐỘNG VIÊN ==========");

  let code = prompt("Nhập mã vận động viên cần xóa:");

  if (code === null) {
    console.log("Đã hủy thao tác xóa!");
    return;
  }

  code = normalizeAthleteCode(code);

  // Tìm vận động viên
  let index = findAthleteIndex(code);

  if (index === -1) {
    console.log(`Không tìm thấy vận động viên có mã ${code}`);
    return;
  }

  // Xác nhận xóa
  let confirmDelete = prompt(
    `Bạn có chắc chắn muốn xóa vận động viên ${code}? (Y/N)`,
  );

  if (confirmDelete === null) {
    console.log("Đã hủy thao tác xóa!");
    return;
  }

  confirmDelete = confirmDelete.trim().toLowerCase();

  if (confirmDelete !== "y") {
    console.log("Đã hủy thao tác xóa!");
    return;
  }

  // Xóa vận động viên
  athletes.splice(index, 1);

  console.log("Xóa vận động viên thành công!");
  console.log(`Số vận động viên còn lại: ${athletes.length}`);
}

// MENU

function displayMenu() {
  console.log("=====================================================");
  console.log(" HỆ THỐNG QUẢN LÝ VẬN ĐỘNG VIÊN CLB THỂ THAO VICTORY ");
  console.log("=====================================================");
  console.log("1. Hiển thị danh sách vận động viên");
  console.log("2. Thêm vận động viên mới");
  console.log("3. Cập nhật thông tin vận động viên");
  console.log("4. Xóa vận động viên");
  console.log("5. Tìm kiếm vận động viên theo môn thi đấu");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");
}

function main() {
  let isRunning = true;

  while (isRunning) {
    displayMenu();

    let choice = prompt("Vui lòng nhập lựa chọn (0 - 5):");

    if (choice === null) {
      console.log("Lựa chọn không hợp lệ!");
      continue;
    }

    choice = choice.trim();

    if (!/^[0-5]$/.test(choice)) {
      console.log("Lựa chọn không hợp lệ!");
      continue;
    }

    switch (choice) {
      case "1":
        showAthletes();
        break;

      case "2":
        addAthletes();
        break;

      case "3":
        updateAthletes();
        break;

      case "4":
        deleteAthletes();
        break;

      case "5":
        console.log("Case 5 chưa được triển khai!");
        break;

      case "0":
        console.log("Cảm ơn bạn đã sử dụng chương trình!");
        isRunning = false;
        break;
    }
  }
}

main();
