<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 08/11/2017
 * Time: 10:55
 */

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class AuthService extends REST_Controller
{
    private $auth_email;
    private $auth_passwd;

    public function __construct($config = 'rest')
    {
        parent::__construct($config);
    }

    /**
     * Processar a autenticação do usuário
     *
    */
    public function Auth_post(){
        $this->auth_passwd  = $this->post('passwd');
        $this->auth_email   = $this->post('email');

        //processar a informação
    }
}