---
title: "poi 개발"
section: posts
lastUpdated: "2024/08/22 19:37:00"
subTitle: "poi 개발"
tags: ["java"]
---

## maven dependency 설정

기존 레거시 시스템에 open jdk 1.8 poi 3.8 버전을 사용하고 있었다.  
xslx write 할 때 버전이 맞지 않는 오류 발생하여 강제로 버전을 맞춰 주었다.  
보기엔 별거 아닌거 같지만... 삽질을 겁나 했다,,

```xml
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi</artifactId>
  <version>3.9</version>
</dependency>
  
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi-ooxml</artifactId>
  <version>3.9</version>
</dependency>

<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi-ooxml-schemas</artifactId>
  <version>3.9</version>
</dependency>

<dependency>
  <groupId>org.apache.xmlbeans</groupId>
  <artifactId>xmlbeans</artifactId>
  <version>2.3.0</version>
</dependency>
```

## excel dropdown 다건 구현

[excel dropdown 다건 구현](https://stackoverflow.com/questions/27630507/is-there-a-max-number-items-while-generating-drop-down-list-in-excel-using-apach)

엑셀은 한 셀당 256 characters 만 기술 가능 하다. 

기존 방식으로 256문자가 넘어가는 드롭다운은 생성 불가 한데, 꼼수가 있다.

새로운 시트를 만들어서 해당 시트에 드롭다운 리스트를 적어주고

함수로 해당 리스트를 불러오는 방식이다.

```java
validationHelper = new XSSFDataValidationHelper(sheet);
addressList = new CellRangeAddressList(8, 1600, 2, 2);
DeliveryInfo deliveryInfo = new DeliveryInfo();
List<DeliveryInfo> arrDeliComList = commonInfoService.getDeliCompanyList(deliveryInfo);

XSSFSheet hidden = wb.createSheet("hidden");
for (int i = 0, length= arrDeliComList.size(); i < length; i++) {
    String name = arrDeliComList.get(i).getDeliCompNm();
    XSSFRow hiddenrow = hidden.createRow(i);
    XSSFCell hiddencell = hiddenrow.createCell(0);
    hiddencell.setCellValue(name);
}

DataValidation dataValidation = null;
constraint =validationHelper.createFormulaListConstraint("hidden!$A$1:$A$" + arrDeliComList.size());
dataValidation = validationHelper.createValidation(constraint, addressList);
dataValidation.setSuppressDropDownArrow(true);

wb.setSheetHidden(1, true);
dataValidation.setShowErrorBox(true);
dataValidation.createErrorBox("ERROR", "올바른 택배사를 선택하세요");
sheet.addValidationData(dataValidation);
```
