<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 08/11/2017
 * Time: 10:55
 */
//defined('BASEPATH') OR exit('No direct script access allowed');

//require APPPATH . '/libraries/REST_Controller.php';

public class Authservice
{
    private $auth_email;
    private $auth_passwd;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Processar a autenticação do usuário
     *
    */

    public function teste_get(){
        echo "teste";
    }

    public function auth(){
        $this->auth_passwd  = $this->post('passwd');
        $this->auth_email   = $this->post('email');

        //processar a informação

        echo json_encode(array(
            'success'=>true,
            'data'=>array(
                'teste'=>'teste sdsds',
                'id'=>23
            ),
            'metadata'=>array(
                'totalResults'=>0,
                'allResults'=>0,
            )
        ));




    }
}