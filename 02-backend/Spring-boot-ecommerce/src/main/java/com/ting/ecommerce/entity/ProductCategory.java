package com.ting.ecommerce.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name="product_category")
// @Data -- known bug
//@Getter
//@Setter
@Data
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @OneToMany(cascade =CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;


    @Column(name = "category_name")
    private String categoryName;



}
