package org.example;

import java.util.Arrays;
import java.util.Collections;
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //int, double, float, short, String, char, boolean
        //розмір масиву
        final int n = 10;
        Integer [] mas = new Integer[n];
        for (int i=0; i<n; i++) {
            mas[i]=getRandom(18,60);
        }
        for(var item : mas) {
            System.out.printf("%d\t",item);
        }
        System.out.println();
        System.out.println("Сортований масив");
        Arrays.sort(mas, Collections.reverseOrder());
        for(var item : mas) {
            System.out.printf("%d\t",item);
        }
    }

    private static int getRandom(int min, int max) {
        Random rand = new Random();
        return rand.nextInt(max-min)+min;
    }
}