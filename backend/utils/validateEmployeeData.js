const validateEmployeeData = (data) => {
    const errors = [];
  
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }
  
    if (!data.email || data.email.trim() === '') {
      errors.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Invalid email format');
    }
  
    if (!data.mobileNo || data.mobileNo.trim() === '') {
      errors.push('Mobile No. is required');
    } else if (!/^\d{10}$/.test(data.mobileNo)) {
      errors.push('Invalid mobile number');
    }
  
    else if (!data.designation || !['HR', 'Manager', 'Sales'].includes(data.designation)) {
      errors.push('Invalid designation');
    }
  
    if (!data.gender || !['Male', 'Female', 'Other'].includes(data.gender)) {
      errors.push('Invalid gender');
    }
  
    if (!data.course || data.course.length === 0) {
      errors.push('At least one course must be selected');
    } else if (!data.course.every(course => ['MCA', 'BCA', 'BSC'].includes(course))) {
      errors.push('Invalid course selection');
    }
  
    if (!data.image) {
      errors.push('Image is required');
    }
  
    return errors;
  };
  