<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */

class AuthServices extends CI_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
    }

    private $user;
    private $user_name;
    private $user_passwd;
    private $token_active;

    public function Auth(){
        $this->token_active = $this->input->header('token');
        /** TODO checar usuário para fazer login **/
    }

    /**
     * Verifica se a sessão está ativa através do token de sessão
     * Se estiver retorna true, se não false.
     * http header => token
    */
    public function AuthActive(){

    }
}